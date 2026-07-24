"use client";

import React from "react";
import { Steps } from "antd";
import { STEPS, ACTIVE_STEP_INDEX } from "./ImportRequestA4.config";

/**
 * Progress stepper for the request lifecycle. antd renders completed steps as
 * filled circles with a check mark and highlights the current one — recolored
 * to the approved green by the `Steps` component token in `UIProvider`.
 */
export default function RequestSteps() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <Steps
        className="mx-auto min-w-[680px] max-w-[880px]"
        labelPlacement="vertical"
        current={ACTIVE_STEP_INDEX}
        items={STEPS.map((step) => ({ title: step.label }))}
      />
    </div>
  );
}
