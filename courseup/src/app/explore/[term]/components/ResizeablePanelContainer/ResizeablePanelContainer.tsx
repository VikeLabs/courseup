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
}: ResizeablePanelContainerProps): JSX.Element {
  return (
    <PanelGroup direction="horizontal">
      <Panel order={1} minSize={mainPanelMinSize} defaultSize={mainPanelDefaultSize}>
        {mainPanelContent}
      </Panel>
      {/*
        TODO: the hover color change effect isn't working (not just on handles but on like everything)
        */}
      <PanelResizeHandle className="w-1.5 bg-base-300 hover:bg-base-content active:bg-base-content transition-all duration-200 rounded-full mx-3" />
      <Panel order={2} defaultSize={100 - (mainPanelDefaultSize || mainPanelDefaultSize || 0)}>
        {children}
      </Panel>
    </PanelGroup>
  );
}
