import { Popover, PopoverTrigger, Button, PopoverContent, RadioGroup, Radio } from "@nextui-org/react";
import Icon from "../Icon";
import { useContext } from "react";
import { SearchFilterContext } from "../../context/SearchFilterContext";

export default function FilterTypeButton() {
  const searchTypeContext = useContext(SearchFilterContext);
  return (
    <>
      <div className="flex justify-end px-5 lg:hidden">
        <Popover placement="left" className="float-right dark">
          <PopoverTrigger>
            <Button isIconOnly variant="light">
              <Icon className="text-2xl" icon="bi-filter-circle"></Icon>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <RadioGroup
              color="secondary"
              value={searchTypeContext?.filterType}
              onValueChange={searchTypeContext?.setFilterType}
              className="lg:hidden"
            >
              <Radio value="controversial">Controverse</Radio>
              <Radio value="unpopular">Unpopular</Radio>
              <Radio value="mainstream">Mainstream</Radio>
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
