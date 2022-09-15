import React, { useEffect } from "react";
import styled from "styled-components";
import AddMenu from "../../pages/PageBuilder/AddMenu";
import AddWidget from "../../pages/PageBuilder/AddWidget";
import { WIDGET } from "./common";
import { MODE } from "../../pages/PageBuilder/common";

const ActionButtons = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  gap: 0.5rem;
  align-items: center;

  i {
    font-size: 0.75rem;
    cursor: pointer;
  }
`;

const previewStyles = {
  border: "1px dashed #ccc",
  padding: "1.25rem",
  position: "relative",
  marginBottom: "0.25rem",
};

const WidgetRow = ({
  widget,
  onAddWidget,
  onEditWidget,
  onDeleteWidget,
  mode,
}) => {
  return (
    <div
      style={{
        ...(mode === MODE.EDIT && previewStyles),
        ...(widget.type === WIDGET.ROW ? widget.style : {}),
      }}
    >
      {mode === MODE.EDIT && (
        <ActionButtons>
          {widget.type === WIDGET.ROW && (
            <AddMenu
              component={AddWidget}
              onFinish={(widgetType) => onAddWidget(widgetType, widget.uuid)}
            ></AddMenu>
          )}
          <i
            className="fa-solid fa-pen"
            onClick={() => onEditWidget(widget.uuid)}
          ></i>
          <i
            className="fa-solid fa-times"
            onClick={() => onDeleteWidget(widget.uuid)}
          ></i>
        </ActionButtons>
      )}
      {widget.widgets &&
        !!widget.widgets.length &&
        widget.widgets.map((nestedWidget, nestedWidgetIndex) => (
          <WidgetRow
            widget={nestedWidget}
            key={nestedWidgetIndex}
            onAddWidget={onAddWidget}
            onEditWidget={onEditWidget}
            onDeleteWidget={onDeleteWidget}
            mode={mode}
          />
        ))}

      {widget.type === WIDGET.RICH_TEXT && (
        <div
          data-widget-type={widget.type}
          dangerouslySetInnerHTML={{ __html: widget.value }}
        />
      )}

      {widget.type === WIDGET.PICTURE && (
        <img
          src={import.meta.env.VITE_API_URL + widget.value}
          alt="image"
          style={widget.style}
        />
      )}
    </div>
  );
};

function Previewer({
  widgets,
  onAddWidget,
  onEditWidget,
  onDeleteWidget,
  mode,
}) {
  return (
    <div style={{ ...(mode === MODE.EDIT && previewStyles) }}>
      {mode === MODE.EDIT && (
        <ActionButtons>
          <AddMenu
            only={[WIDGET.ROW]}
            component={AddWidget}
            onFinish={(widgetType) => onAddWidget(widgetType)}
          ></AddMenu>
        </ActionButtons>
      )}
      {widgets.map((widget, widgetIndex) => (
        <div key={widgetIndex}>
          {widget.type === WIDGET.RICH_TEXT && (
            <div style={{ ...(mode === MODE.EDIT && previewStyles) }}>
              {mode === MODE.EDIT && (
                <ActionButtons>
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => onEditWidget(widget.uuid)}
                  ></i>
                  <i
                    className="fa-solid fa-times"
                    onClick={() => onDeleteWidget(widget.uuid)}
                  ></i>
                </ActionButtons>
              )}
              <div dangerouslySetInnerHTML={{ __html: widget.value }} />
            </div>
          )}

          {widget.type === WIDGET.PICTURE && (
            <div style={{ ...(mode === MODE.EDIT && previewStyles) }}>
              {mode === MODE.EDIT && (
                <ActionButtons>
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => onEditWidget(widget.uuid)}
                  ></i>
                </ActionButtons>
              )}
              <img
                src={import.meta.env.VITE_API_URL + widget.value}
                alt="image"
                style={widget.style}
              />
            </div>
          )}

          {widget.type === WIDGET.ROW && (
            <WidgetRow
              widget={widget}
              onAddWidget={onAddWidget}
              onEditWidget={onEditWidget}
              onDeleteWidget={onDeleteWidget}
              mode={mode}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Previewer;
