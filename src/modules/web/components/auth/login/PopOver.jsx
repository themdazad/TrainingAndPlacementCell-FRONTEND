import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import PropTypes from "prop-types";

export default function PopOver({ tittle, PopOverMessage }) {
  const content = (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small text-center font-bold text-danger" {...titleProps}>
            {PopOverMessage}
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full">
            {/* PopOver Content Code */}
          </div>
        </div>
      )}
    </PopoverContent>
  );

  return (
    <Popover showArrow backdrop={"blur"} offset={10} placement="top">
      <PopoverTrigger>
        <p className=" cursor-pointer " color="warning">
          {tittle}
        </p>
      </PopoverTrigger>
      {content}
    </Popover>
  );
}

PopOver.propTypes = {
  tittle: PropTypes.string.isRequired,
};
