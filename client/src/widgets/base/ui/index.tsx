import { ChatList } from "@/features/chat";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable";
import { type FC } from "react";

export const Base: FC = () => {
	return (
		<ResizablePanelGroup direction='horizontal'>
			<ResizablePanel
				id='left-panel'
				className='sm:min-w-[200px] bg-neutral-800 flex'
				defaultSize={20}
			>
				<ChatList />
			</ResizablePanel>
			<ResizableHandle className='bg-zinc-800 w-0.5 hover:bg-sky-300 transition-[0.2s]    ' />
			<ResizablePanel className='min-w-[1100px]'>Two</ResizablePanel>
		</ResizablePanelGroup>
	);
};
