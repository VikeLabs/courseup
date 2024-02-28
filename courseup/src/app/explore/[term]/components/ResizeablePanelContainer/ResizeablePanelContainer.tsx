'use client';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export interface ResizeablePanelContainerProps {
  mainPanelMinSize?: number;
  mainPanelDefaultSize?: number;
  mainPanelContent: Readonly<React.ReactNode>;
  children: Readonly<React.ReactNode>;
}

export function ResizeablePanelContainer({
  mainPanelMinSize,
  mainPanelDefaultSize,
  mainPanelContent,
  children,
}: ResizeablePanelContainerProps): React.ReactNode {
  return (
    <PanelGroup direction="horizontal">
      <div className="flex gap-2 my-0 py-0">
        <Panel order={1} minSize={mainPanelMinSize} defaultSize={mainPanelDefaultSize}>
          {mainPanelContent}
        </Panel>
        {/*
        TODO: the hover color change effect isn't working (not just on handles but on like everything)
        */}
        <PanelResizeHandle className="w-1.5 bg-base-300 hover:bg-base-content rounded-full mx-3" />
        <Panel order={2} defaultSize={100 - (mainPanelDefaultSize || mainPanelDefaultSize || 0)}>
          <div className="w-full py-0">{children}</div>
        </Panel>
      </div>
    </PanelGroup>
  );
}
