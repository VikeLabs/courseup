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
    <PanelGroup direction="vertical">
      <div className="flex gap-2">
        <Panel order={1} minSize={mainPanelMinSize} defaultSize={mainPanelDefaultSize}>
          {mainPanelContent}
        </Panel>
        {/*
        TODO: the hover effect isn't working and there's a weird visual bug on load
        TODO: the resize handle isn't the proper full height either
        */}
        <PanelResizeHandle className="w-1.5 bg-base-300 rounded-full mx-3 hover:bg-base-content" />
        <Panel order={2}>
          <div className="w-full py-2">{children}</div>
        </Panel>
      </div>
    </PanelGroup>
  );
}
