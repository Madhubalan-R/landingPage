
import "../css/livechart.css";
import { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getValidToken } from "../services/auth";

interface SilverApi {
  id: string;
  date: string;
  rate_925: number;
}

interface GoldApi {
  id: string;
  date: string;
  rate_22k: number;
}

interface ChartData {
  date: string;
  gold: number;
  silver: number;
}

const BASE_URL = "https://api.thebhimajewellery.com";

type AssetType = "gold" | "silver";
type TimeframeType = "5D" | "1M" | "3M" | "1YR";

export default function RateChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [activeTab, setActiveTab] = useState<AssetType>("gold");
  const [timeframe, setTimeframe] = useState<TimeframeType>("5D");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, [timeframe]);

  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const token = await getValidToken();
      const headers = {
        apikey: token,
        Authorization: `Bearer ${token}`,
      };

      const now = new Date();
      let startDate = new Date();
      if (timeframe === "5D") startDate.setDate(now.getDate() - 5);
      else if (timeframe === "1M") startDate.setMonth(now.getMonth() - 1);
      else if (timeframe === "3M") startDate.setMonth(now.getMonth() - 3);
      else if (timeframe === "1YR") startDate.setFullYear(now.getFullYear() - 1);

      const dateStr = startDate.toISOString().split("T")[0];

      const [silverRes, goldRes] = await Promise.all([
        fetch(
          `${BASE_URL}/rest/v1/silver_rates?select=date,rate_925&date=gte.${dateStr}&order=date.asc`,
          { headers }
        ),
        fetch(
          `${BASE_URL}/rest/v1/gold_rates?select=date,rate_22k&date=gte.${dateStr}&order=date.asc`,
          { headers }
        ),
      ]);

      if (!silverRes.ok || !goldRes.ok) {
        throw new Error("Failed to fetch rates");
      }

      const silverRaw: SilverApi[] = await silverRes.json();
      const goldRaw: GoldApi[] = await goldRes.json();

      const dateMap: { [key: string]: ChartData } = {};

      goldRaw.forEach((g) => {
        if (!dateMap[g.date]) {
          dateMap[g.date] = { date: g.date, gold: 0, silver: 0 };
        }
        dateMap[g.date].gold = g.rate_22k;
      });

      silverRaw.forEach((s) => {
        if (!dateMap[s.date]) {
          dateMap[s.date] = { date: s.date, gold: 0, silver: 0 };
        }
        dateMap[s.date].silver = s.rate_925;
      });

      const merged = Object.values(dateMap).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      setData(merged);
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const latest = data[data.length - 1];
  const prev = data[data.length - 2];

  const goldUp = latest && prev ? latest.gold >= prev.gold : true;
  const silverUp = latest && prev ? latest.silver >= prev.silver : true;

  const chartStyles = useMemo(() => {
    if (activeTab === "gold") {
      return {
        stroke: "#EF4444",
        gradientId: "goldGradient",
        startColor: "#FACC15",
        stopColor: "#FFFBEB",
      };
    } else {
      return {
        stroke: "#64748B",
        gradientId: "silverGradient",
        startColor: "#CBD5E1",
        stopColor: "#F8FAFC",
      };
    }
  }, [activeTab]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  return (
    <div className="liveSection">
      <div className="whychoosebhima">
        <div className="chartCard">
          <h2 className="mainTitle">
            Live Rate Tracking <br /> (Gold/Silver)
          </h2>

          <div className="legendRow">
            <div className="legendItem">
              <span className="dot goldDot"></span>
              <span className="assetLabel">Gold</span>
              <span className={`rateValue ${goldUp ? "up" : "down"}`}>
                {latest?.gold?.toLocaleString() || "..."}{" "}
                {goldUp ? <i className="arrow up-arrow"></i> : <i className="arrow down-arrow"></i>}
              </span>
            </div>
            <div className="legendItem">
              <span className="dot silverDot"></span>
              <span className="assetLabel">Silver</span>
              <span className={`rateValue ${silverUp ? "up" : "down"}`}>
                {latest?.silver?.toLocaleString() || "..."}{" "}
                {silverUp ? <i className="arrow up-arrow"></i> : <i className="arrow down-arrow"></i>}
              </span>
            </div>
          </div>

          <div className="tabContainer">
            <div className={`tabHighlight ${activeTab === "silver" ? "silver" : ""}`}></div>
            <button
              className={`tabButton ${activeTab === "gold" ? "active" : ""}`}
              onClick={() => setActiveTab("gold")}
            >
              Live Gold Rate
            </button>
            <button
              className={`tabButton ${activeTab === "silver" ? "active" : ""}`}
              onClick={() => setActiveTab("silver")}
            >
              Live Silver Rate
            </button>
          </div>

          <div className="timeframeContainer">
            {["5D", "1M", "3M", "1YR"].map((tf) => (
              <button
                key={tf}
                className={`tfButton ${timeframe === tf ? "active" : ""}`}
                onClick={() => setTimeframe(tf as TimeframeType)}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="chartWrapper">
            {isLoading && <div className="loadingOverlay">Updating Rates...</div>}
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={chartStyles.gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartStyles.startColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartStyles.stopColor} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: any) => [value?.toLocaleString() || "0", activeTab.toUpperCase()]}
                  labelFormatter={(label: any) => formatDate(label)}
                />
                <Area
                  type="monotone"
                  dataKey={activeTab}
                  stroke={chartStyles.stroke}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#${chartStyles.gradientId})`}
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="content">
          <h2>Why Choose BHIMA</h2>
          <div className="source-row">
            <div className="source">
              <img src="chartsection/source.png" alt="" />
              <span></span>
              <h3>Quick Enrol</h3>
              <p>Start saving in seconds with just ₹100</p>
            </div>
            <div className="source">
              <img src="chartsection/diamond.png" alt="" />
              <span></span>
              <h3>Easy Steps</h3>
              <p>Simple steps, flexible savings and hassle free payments.</p>
            </div>
          </div>
          <div className="source-row">
            <div className="source">
              <img src="chartsection/transparent.png" alt="" />
              <span></span>
              <h3>Transparent Savings</h3>
              <p>Visible of your gold weight and transaction history.</p>
            </div>
          </div>
          <div className="source-row">
            <div className="source">
              <img src="chartsection/BIS.png" alt="" />
              <span></span>
              <h3>Trusted Brand</h3>
              <p>Packed by Bhima Jewellery, a name known for purity and legacy</p>
            </div>
            <div className="source">
              <img src="chartsection/decades.png" alt="" />
              <span></span>
              <h3>Benefits Schemes</h3>
              <p>Enjoy Additional bonus on gold weight on your Savings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
