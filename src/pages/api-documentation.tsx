import React, { useEffect, useState } from "react";
import { EventEmitter } from "events";
import { useStaticQuery, graphql } from "gatsby";
import Documentation from "@open-rpc/docs-react";
import useDarkMode from "use-dark-mode";
import "./api-documentation.css";
import InspectorPlugin from "../docs-react-plugins";
import Inspector from "@open-rpc/inspector";
import * as monaco from "monaco-editor";
import { Button, Grid, Typography, InputBase, Container, Tab, Tabs, IconButton, Tooltip, Dialog, DialogTitle, DialogActions, DialogContent, Avatar } from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Warning from "@material-ui/icons/Warning";
import PlaygroundSplitPane from "../components/PlaygroundSplitPane";
const $RefParser = require("@apidevtools/json-schema-ref-parser"); //tslint:disable-line
import { useTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import useInspectorActionStore from "../stores/inspectorActionStore";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

const docsUrl = 'https://raw.githubusercontent.com/MetaMask/api-specs/gh-pages/latest/metamask-openrpc.json'; 

interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

interface EthereumProvider extends EventEmitter {
  isMetaMask?: boolean;
  request: (args: RequestArguments) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const ApiDocumentation: React.FC = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const currentTheme = useTheme();
  const [horizontalSplit, setHorizontalSplit] = useState(false);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [inspectorContents] = useInspectorActionStore<any>();

  useEffect(() => {
    if (inspectorContents) {
      setHorizontalSplit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspectorContents]);

  useEffect(() => {
    const hasEthereum = window.ethereum && window.ethereum.isMetaMask;
    setShowInstallDialog(!hasEthereum);
  }, [window.ethereum])

  const darkmode = useDarkMode();
  useEffect(() => {
    const t = darkmode.value ? "vs-dark" : "vs";
    if (monaco) {
      monaco.editor.setTheme(t);
    }
    setReactJsonOptions({
      ...reactJsonOptions,
      theme: darkmode.value ? "summerfruit" : "summerfruit:inverted",
    });
  }, [darkmode.value]);

  const [reactJsonOptions, setReactJsonOptions] = useState({
    theme: "summerfruit:inverted",
    collapseStringsAfterLength: 25,
    displayDataTypes: false,
    displayObjectSize: false,
    indentWidth: 2,
    name: false,
  });

  const openrpcQueryData = useStaticQuery(graphql`
    query {
      openrpcDocument {
        id
        openrpcDocument
      }
    }
  `);
  const [openrpcDocument, setOpenrpcDocument] = useState<OpenrpcDocument>();
  const [isFetching, setFetching] = useState<boolean>(false);
  const [latestSpec, setLatestSpec] = useState<any>(null);
  const [inspectorUrl, setInspectorUrl] = useState<string>();
  const [methodFromUrl, setMethodFromUrl] = useState<string>(window.location.hash.substring(1));
  const [uiSchema, setUiSchema] = useState<any>({
    params: {},
    methods: {},
    contentDescriptors: { "ui:hidden": true }
  });

  useEffect(() => {
    if (!latestSpec && !isFetching) {
      setFetching(true);
      getDocs()
      .then((json) => {
        console.log('we have a json', json);
        setLatestSpec(json);
        setFetching(false);
      })
      .catch(console.error);
    }
  });

  useEffect(() => {
    if (openrpcQueryData.openrpcDocument) {
      console.log('we have a document', openrpcQueryData);
      $RefParser.dereference(JSON.parse(openrpcQueryData.openrpcDocument.openrpcDocument)).then(setOpenrpcDocument);
    }
  }, [openrpcQueryData]);

  useEffect(() => {
    if (!openrpcDocument) {
      return;
    }
    if (openrpcDocument.servers && openrpcDocument.servers[0]) {
      setInspectorUrl(openrpcDocument.servers[0].url);
    }
  }, [openrpcDocument]);

  useEffect(() => {
    setTimeout(() => { // defer scrollTo to get elementById
      if (methodFromUrl && methodFromUrl.length) {
        const wrapper = document.getElementsByClassName("left-split")[0];
        const el = document.getElementById(methodFromUrl);
        if (el && wrapper) {
          el.scrollIntoView();
          wrapper.scrollBy(0, -100);
        }
      }
    });
  }, [methodFromUrl])

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setMethodFromUrl(hash);
      setUiSchema({
        params: {},
        methods: {
          "ui:defaultExpanded": {
            [hash]: true
          },
        },
        contentDescriptors: { "ui:hidden": true }
      });
    }
  }, []);

  return (
    <>
      <PlaygroundSplitPane
        direction="horizontal"
        split={horizontalSplit}
        splitLeft={true}
        leftStyle={{
          paddingTop: "64px",
          width: "100%",
          height: "100%",
          overflowY: "auto",
        }}
        rightStyle={{
          width: "100%",
          height: "100%",
        }}
        right={
          <Inspector
            url={inspectorUrl}
            customTransport={{
              type: "plugin",
              name: "MetaMask",
              transport: {
                type: "postmessageiframe",
              },
              uri: "https://metamask.github.io/openrpc-inspector-transport",
            }}
            hideToggleTheme={true}
            openrpcDocument={openrpcDocument}
            darkMode={darkmode.value}
            request={inspectorContents && inspectorContents.request}
          />
        }
        left={
          <>
            <Container>
              <Documentation
                uiSchema={uiSchema}
                onMethodToggle={(method: string, expanded: boolean) => {
                  if (expanded) {
                    window.history.pushState(null, method, '#' + method);
                  }
                }}
                key={JSON.stringify(uiSchema)}
                methodPlugins={[InspectorPlugin]}
                reactJsonOptions={reactJsonOptions}
                schema={openrpcDocument || {} as any}
              />
              <div style={{ marginBottom: "20px" }} />
            </Container>
            <Tabs
              variant="scrollable"
              indicatorColor="primary"
              value={0}
              style={{ position: "absolute", bottom: "0", right: "25px", zIndex: 1, marginBottom: "0px" }}
            >
              <Tab
                onClick={() => setHorizontalSplit(!horizontalSplit)}
                style={{
                  background: currentTheme.palette.background.default,
                  width: "165px",
                  paddingRight: "30px",
                  border: `1px solid ${currentTheme.palette.text.hint}`,
                }}
                label={
                  <div>
                    <Typography
                      variant="body1"><span role="img" aria-label="inspector">🕵️‍♂️</span>️ Inspector</Typography>
                    <Tooltip title="Toggle Inspector">
                      <IconButton style={{ position: "absolute", right: "5px", top: "20%" }} size="small">
                        {horizontalSplit
                          ? <ExpandMore />
                          : <ExpandLess />
                        }
                      </IconButton>
                    </Tooltip>
                  </div>
                }>
              </Tab>
            </Tabs>
          </>
        }>
      </PlaygroundSplitPane>
      <Dialog open={showInstallDialog} onClose={() => setShowInstallDialog(false)}>
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "6px", marginLeft: "6px" }}>
              <Warning />
            </div>
            <Typography variant="h5" style={{ marginTop: "8px", marginLeft: "6px" }}>
              MetaMask Not Detected
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>Install MetaMask for your platform and refresh the page. The interactive features in this documentation require installing the MetaMask extension. <Link variant="body2" component="button" onClick={() => setShowInstallDialog(false)} >Proceed without MetaMask</Link></Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
          <Button startIcon={<Avatar src={"https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"} style={{ opacity: "0.9", height: "24px", width: "24px" }} />} variant="contained" color="primary" href="https://metamask.io/download.html" target="_blank">Download MetaMask</Button>
        </DialogActions>
      </Dialog>
    </>
  );

};

async function getDocs () {
  const doc = await fetch(docsUrl);
  const json = await doc.json();
  return json;
}

export default ApiDocumentation;
