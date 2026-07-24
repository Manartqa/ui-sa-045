"use client";

import React from "react";
import { CheckOutlined, CaretDownFilled } from "@ant-design/icons";
import { STEPS, ACTIVE_STEP_INDEX } from "./ImportRequestA4.config";

const GREEN = "#00C853";
const GRAY_LINE = "#D9D9D9";
const GRAY_CURRENT = "#8C8C8C";

/**
 * Full-width progress stepper: completed/current steps are green filled
 * circles with a check mark (caret marker above the current one), upcoming
 * steps are numbered outline circles — per the approved reference style.
 */
export default function RequestSteps() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex min-w-[720px]">
        {STEPS.map((step, i) => {
          const isDone = i < ACTIVE_STEP_INDEX;
          const isCurrent = i === ACTIVE_STEP_INDEX;
          const isFirst = i === 0;
          const isLast = i === STEPS.length - 1;
          // segment between step i-1 and i is green only when step i-1 is completed
          const leftGreen = !isFirst && i - 1 < ACTIVE_STEP_INDEX;
          const rightGreen = !isLast && i < ACTIVE_STEP_INDEX;

          return (
            <div key={step.no} className="flex flex-1 flex-col items-center">
              <div className="mb-1 flex h-[14px] items-end">
                {isCurrent && (
                  <CaretDownFilled
                    className="text-[14px]"
                    style={{ color: GRAY_CURRENT }}
                  />
                )}
              </div>
              <div className="flex w-full items-center">
                <div
                  className="h-[3px] flex-1"
                  style={{
                    background: isFirst
                      ? "transparent"
                      : leftGreen
                        ? GREEN
                        : GRAY_LINE,
                  }}
                />
                <div
                  className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={
                    isDone
                      ? { background: GREEN, color: "#fff" }
                      : {
                          background: "#fff",
                          border: `2px solid ${GRAY_LINE}`,
                          color: "rgba(0,0,0,0.25)",
                        }
                  }
                >
                  {isDone ? <CheckOutlined /> : step.no}
                </div>
                <div
                  className="h-[3px] flex-1"
                  style={{
                    background: isLast
                      ? "transparent"
                      : rightGreen
                        ? GREEN
                        : GRAY_LINE,
                  }}
                />
              </div>
              <div
                className="mt-2 px-1 text-center text-sm leading-[22px]"
                style={{ color: "rgba(0,0,0,0.45)" }}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
