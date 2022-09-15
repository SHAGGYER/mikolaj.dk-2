import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PublicContext from "contexts/PublicContext";
import { useClickOutside } from "../../hooks/ClickOutside";
import { Link, NavBox, RenderProps } from "components/Navigation/Navigation";
import { SubmenuElementProps } from "components/Navigation/Submenu";
import { Badge } from "components/UI/Badge";

interface SubmenuRendererProps extends SubmenuElementProps {
  title: string;
  icon?: string;
  render: (renderProps: RenderProps) => ReactNode;
  badge?: string;
}

export const SubmenuRenderer: React.FC<SubmenuRendererProps> = ({
  title,
  render,
  icon,
  badge,
  right,
}) => {
  const { redirect, isMobile, isSidebarOpen } = useContext(PublicContext);
  const [isOpen, setOpen] = useState(undefined);

  const linkRef = useRef(undefined);

  useEffect(() => {
    if (!isSidebarOpen) {
      setOpen(undefined);
    }
  }, [isSidebarOpen]);

  const wrapperRef = useRef<any>();

  useClickOutside(wrapperRef, () => isOpen && setOpen(false));

  const redirectTo = (path: string) => {
    redirect(path);
    setOpen(false);
  };

  const onClick = () => {
    if (isOpen === undefined) {
      setOpen(true);
    } else {
      setOpen(!isOpen);
    }
  };

  return (
    <NavBox ref={wrapperRef} isMobile={isMobile}>
      {!!badge && (
        <div className="badge-container">
          <Badge
            textColor="white"
            color="var(--secondary)"
            small
            absolute
            style={{ top: -8, right: 5, alignSelf: "flex-end" }}
          >
            {badge}
          </Badge>
        </div>
      )}
      <Link onClick={() => onClick()} ref={linkRef}>
        {icon && <i className={icon} />}
        <span>{title}</span>
      </Link>
      {isOpen &&
        render({
          redirectTo,
          isOpen,
          setOpen,
          isMobile,
          isSidebarOpen,
          right,
          linkRef,
        })}
    </NavBox>
  );
};
