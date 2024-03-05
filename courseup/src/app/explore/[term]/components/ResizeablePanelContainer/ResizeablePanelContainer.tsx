'use client';

import classNames from 'classnames';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export interface ResizeablePanelContainerProps {
  mainPanelMinSize?: number;
  mainPanelMaxSize?: number;
  mainPanelDefaultSize?: number;
  mainPanelContent: Readonly<React.ReactNode>;
  panelId: string;
  children: Readonly<React.ReactNode>;
}

export function ResizeablePanelContainer({
  mainPanelMinSize,
  mainPanelMaxSize,
  mainPanelDefaultSize,
  mainPanelContent,
  panelId,
  children,
}: ResizeablePanelContainerProps): JSX.Element {
  return (
    <PanelGroup direction="horizontal" autoSaveId={panelId}>
      <Panel order={1} minSize={mainPanelMinSize} maxSize={mainPanelMaxSize} defaultSize={mainPanelDefaultSize}>
        {mainPanelContent}
      </Panel>
      <PanelResizeHandle
        className="flex"
        hitAreaMargins={
          // The mouse is able to enter the "drag area" without triggering css effects
          // This object adjusts that area as best as possible to minimize the area
          // In which the mouse is able to enter and NOT trigger effects (I couldn't find
          // any good documentation describing what coarse and fine actualy do)
          { coarse: 1, fine: 1 }
        }
      >
        <div className="group w-full h-full flex">
          <div
            className={classNames(
              'w-1.5 bg-base-300 rounded-full mx-3',
              'group-hover:bg-base-content group-active:bg-primary transition-all duration-200'
            )}
          />
        </div>
      </PanelResizeHandle>
      <Panel order={2} defaultSize={100 - (mainPanelDefaultSize || mainPanelDefaultSize || 0)}>
        {children}
      </Panel>
    </PanelGroup>
  );
}
