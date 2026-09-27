"use client";

import type { ChartDatum } from "@/lib/types";

type BarChartProps = {
  title: string;
  data: ChartDatum[];
  emptyText: string;
};

export function BarChart({ title, data, emptyText }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="bar-chart">
      <h3>{title}</h3>
      {data.length === 0 ? (
        <p className="cms-meta">{emptyText}</p>
      ) : (
        <ul className="bar-chart__list">
          {data.map((item) => (
            <li key={item.key} className="bar-chart__row">
              <div className="bar-chart__meta">
                <span className="bar-chart__label">{item.label}</span>
                <strong className="bar-chart__value">{item.value}</strong>
              </div>
              <div className="bar-chart__track" aria-hidden="true">
                <div
                  className="bar-chart__fill"
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
