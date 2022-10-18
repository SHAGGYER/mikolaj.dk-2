import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RichText from "./Widgets/RichText";
import Previewer from "../../components/PageBuilder/Previewer";
import { MODE } from "./common";
import { WIDGET } from "../../components/PageBuilder/common";
import Picture from "./Widgets/Picture";
import Row from "./Widgets/Row";
import { v4 } from "uuid";
import Button from "../../components/Button";

const sampleWidgets = [];

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const EditMenu = styled.div`
  border: 1px solid black;
  padding: 1rem;
  width: 300px;
`;

const Page = styled.div`
  border: 1px solid black;
  padding: 0.5rem;
  flex: 1;
`;

function PageBuilder(props) {
  const [widgets, setWidgets] = useState(sampleWidgets);
  const [mode, setMode] = useState(MODE.EDIT);
  const [selectedEditWidget, setSelectedEditWidget] = useState(null);

  /* Delete Widget */

  const onDeleteWidget = (uuid) => {
    setWidgets((prevState) => {
      const newWidgets = findAndDeleteWidget(prevState, uuid);
      return [...newWidgets];
    });
  };

  const findAndDeleteWidget = (widgets, uuid) => {
    if (!widgets) return [];
    let w = widgets.find((x) => x.uuid === uuid);

    if (!w) {
      for (let thisWidget of widgets) {
        thisWidget.widgets = findAndDeleteWidget(thisWidget.widgets, uuid);
      }
    } else {
      return widgets.filter((x) => x.uuid !== uuid);
    }

    return widgets;
  };

  /* Edit Widget */

  const onEditWidget = (uuid) => {
    setWidgets((prevState) => {
      findAndEditWidget(prevState, uuid);
      return prevState;
    });
  };

  const findAndEditWidget = (widgets, uuid) => {
    if (!widgets) return;
    let w = widgets.find((x) => x.uuid === uuid);

    if (!w) {
      for (let thisWidget of widgets) {
        findAndEditWidget(thisWidget.widgets, uuid);
      }
    } else {
      setSelectedEditWidget(w);
    }
  };

  const onUpdateValue = ({ style, value }) => {
    setWidgets((prevState) => {
      findAndUpdateWidget(prevState, selectedEditWidget.uuid, style, value);
      return [...prevState];
    });
  };

  const findAndUpdateWidget = (widgets, uuid, style, value) => {
    if (!widgets) return;
    let w = widgets.find((x) => x.uuid === uuid);

    if (!w) {
      for (let thisWidget of widgets) {
        findAndUpdateWidget(thisWidget.widgets, uuid, style, value);
      }
    } else {
      w.value = value;
      w.style = { ...style };
    }
  };

  /* Add Widget */

  const onAddWidget = (widgetType, uuid) => {
    setWidgets((prevState) => {
      findAndAddWidgetWithUuid(prevState, widgetType, uuid);
      return [...prevState];
    });
  };

  const findAndAddWidgetWithUuid = (widgets, widgetType, uuid) => {
    if (!widgets) return;

    if (!uuid) {
      widgets.push({
        style: {},
        type: widgetType,
        value: "",
        uuid: v4(),
        widgets: [],
      });

      return;
    }

    let w = widgets.find((x) => x.uuid === uuid);

    if (!w) {
      for (let thisWidget of widgets) {
        findAndAddWidgetWithUuid(thisWidget.widgets, widgetType, uuid);
      }
    } else {
      w.widgets.push({
        style: {},
        type: widgetType,
        value: "",
        uuid: v4(),
        widgets: [],
      });
    }
  };

  const toggleMode = () => {
    if (mode === MODE.EDIT) return setMode(MODE.PREVIEW);
    return setMode(MODE.EDIT);
  };

  return (
    <>
      <h1>Page Builder</h1>
      <Button onClick={toggleMode}>
        {mode === MODE.EDIT ? "Preview" : "Edit"}
      </Button>
      <Wrapper>
        {mode === MODE.EDIT && (
          <EditMenu>
            <h2>Edit Menu</h2>
            {selectedEditWidget && (
              <>
                {selectedEditWidget.type === WIDGET.RICH_TEXT && (
                  <RichText
                    html={selectedEditWidget.value}
                    onUpdateValue={onUpdateValue}
                  />
                )}

                {selectedEditWidget.type === WIDGET.PICTURE && (
                  <Picture
                    html={selectedEditWidget.value}
                    onUpdateValue={onUpdateValue}
                  />
                )}

                {selectedEditWidget.type === WIDGET.ROW && (
                  <Row onUpdateValue={onUpdateValue} />
                )}
              </>
            )}
          </EditMenu>
        )}
        <Page>
          <Previewer
            widgets={widgets}
            mode={mode}
            onEditWidget={onEditWidget}
            onAddWidget={onAddWidget}
            onDeleteWidget={onDeleteWidget}
          />
        </Page>
      </Wrapper>
    </>
  );
}

export default PageBuilder;
