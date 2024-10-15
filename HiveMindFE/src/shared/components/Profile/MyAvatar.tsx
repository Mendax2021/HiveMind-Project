import { forwardRef, useMemo } from "react";
import { AvatarIcon, useAvatar, AvatarProps as BaseAvatarProps } from "@nextui-org/react";
import Icon from "../Icon";

//aggiungo la prop showEditIcon alle props di base dell`avatar della libreria
export interface AvatarProps extends BaseAvatarProps {
  showEditIcon?: boolean;
}

const MyAvatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const { showEditIcon = false, ...restProps } = props;
  const {
    src,
    icon = <AvatarIcon />,
    alt,
    classNames,
    slots,
    name,
    showFallback,
    fallback: fallbackComponent,
    getInitials,
    getAvatarProps,
    getImageProps,
  } = useAvatar({
    ref,
    ...restProps,
  });

  const fallback = useMemo(() => {
    if (!showFallback && src) return null;

    const ariaLabel = alt || name || "avatar";

    if (fallbackComponent) {
      return (
        <div aria-label={ariaLabel} className={slots.fallback({ class: classNames?.fallback })} role="img">
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span aria-label={ariaLabel} className={slots.name({ class: classNames?.name })} role="img">
        {getInitials(name)}
      </span>
    ) : (
      <span aria-label={ariaLabel} className={slots.icon({ class: classNames?.icon })} role="img">
        {icon}
      </span>
    );
  }, [showFallback, src, fallbackComponent, name, classNames]);

  return (
    <div className="relative" {...getAvatarProps()}>
      {src && <img {...getImageProps()} alt={alt} />}
      {fallback}

      {showEditIcon && (
        <div className="absolute w-full h-full bg-gray-700/50 hover:bg-gray-700/70 hover:text-slate-400 rounded-full flex flex-col text-center items-center justify-center cursor-pointer">
          <Icon className="md:text-2xl text-lg" icon="bi-pencil" />
          <p className="md:text-sm text-xs">modifica </p>
        </div>
      )}
    </div>
  );
});

export default MyAvatar;
