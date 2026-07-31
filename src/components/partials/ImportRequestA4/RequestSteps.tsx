"use client";

import React from "react";
import { stepIndexOf } from "@/constant/requestStatus";
import type { RequestStatus } from "@/types/app/importRequestA4";
import { STEPS, STEP_COLORS } from "./ImportRequestA4.config";

/**
 * Progress stepper for the request lifecycle — Figma node 4025:190464.
 *
 * Hand-rolled rather than antd `Steps`: the design numbers every circle (antd
 * paints a check on finished steps), runs the connector out of the right of the
 * circle instead of between items, and marks the current step with a caret
 * above it. Each column is 130px wide; the last one is just the circle.
 *
 * Tailwind preflight is off in this project, so `box-border` and `m-0` are
 * spelled out — the circle would otherwise measure 38px and the label would
 * keep its UA margin.
 */
interface RequestStepsProps {
  /** Which circle is current is derived from this — never passed in directly. */
  status: RequestStatus;
}

export default function RequestSteps({ status }: RequestStepsProps) {
  const currentStep = stepIndexOf(status);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-end justify-center pb-8">
        {STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <div
              key={step.no}
              className={`flex shrink-0 flex-col items-start ${
                isLast ? "" : "w-[130px]"
              }`}
            >
              {isActive && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/icons/step-current.svg"
                  alt=""
                  aria-hidden
                  className="h-[32px] w-[34px]"
                />
              )}

              <div className="flex w-full items-center">
                <div
                  className="box-border flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border-2 border-solid"
                  style={{
                    borderColor: isActive
                      ? STEP_COLORS.activeBorder
                      : STEP_COLORS.border,
                    color: isActive
                      ? STEP_COLORS.activeNumber
                      : STEP_COLORS.number,
                  }}
                >
                  <span className="text-center text-sm font-bold leading-[22px]">
                    {step.no}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className="h-[2px] flex-1"
                    style={{ background: STEP_COLORS.border }}
                  />
                )}
              </div>

              {/* The label is wider than its 34px column and overflows evenly
                  on both sides. `whitespace-pre` keeps the designed line breaks
                  and stops Thai from splitting mid-word. */}
              <div className="flex h-[30px] w-[34px] items-start justify-center py-1">
                <p
                  className="m-0 shrink-0 whitespace-pre text-center text-sm leading-[22px]"
                  style={{
                    color: isActive
                      ? STEP_COLORS.activeLabel
                      : STEP_COLORS.label,
                  }}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
