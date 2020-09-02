import { useEffect, useRef, useState } from 'react';

import getEnvironment from '~/utilities/get-environment';
import useChrome from '^/hooks/use-chrome';
import useDebouncedValue from '~/hooks/use-debounced-value';
import useWorkspace from '~/hooks/use-workspace';

const { IS_DEV_TOOLS } = getEnvironment();

export default function useWorkspaceSync({ IS_CONTENT } = {}) {
  if (IS_DEV_TOOLS) {
    const workspaceRef = useRef();
    const chrome = useChrome();
    const { workspace } = useWorkspace();
    const debouncedWorkspace = useDebouncedValue(workspace);

    useEffect(() => {
      workspaceRef.current = debouncedWorkspace;

      blastWorkspace({ chrome, workspace: debouncedWorkspace });
    }, [debouncedWorkspace]);

    useEffect(() => {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const { getWorkspace } = request;

        if (getWorkspace) {
          const workspace = workspaceRef.current;
          const tab = workspace.tabs[sender.tab.id];

          sendResponse({ tab, workspace });
        }
      });
    }, []);
  }

  if (IS_CONTENT) {
    const chrome = useChrome();
    const [tab, setTab] = useState(null);
    const [workspace, setWorkspace] = useState(null);

    useEffect(() => {
      if (chrome) {
        function handleIncoming(response) {
          if (response) {
            const { tab, workspace } = response;
            setTab(tab);
            setWorkspace(workspace);
          } else {
            console.info('sendMessage error:', chrome.runtime.lastError.message);
          }
        }

        chrome.runtime.sendMessage({ getWorkspace: true }, handleIncoming);
        chrome.runtime.onMessage.addListener(handleIncoming);
      }
    }, [setTab, setWorkspace]);

    return { tab, workspace };
  }
}

function blastWorkspace({ chrome, workspace }) {
  if (chrome && workspace) {
    const tabIds = Object.keys(workspace.tabs);
    const isEmpty = !tabIds.length;

    if (isEmpty) {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, { tab: null, workspace }));
      });
    } else {
      tabIds.forEach((tabId) => {
        const tab = workspace.tabs[tabId];

        chrome.tabs.sendMessage(+tabId, { tab, workspace });
      });
    }
  }
}
