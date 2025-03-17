import StatusTitles from "@/components/home/StatusTitles";

import TasksContainer from "@/components/home/TasksContainer";
import { getTasks } from "@/service/data-service";
import { boldFont } from "./fonts/fontWeigtht";
import FilterMenu from "@/components/filters/FilterMenu";
import FilterContainer from "@/components/filters/FilterContainer";

export default async function page() {
  const tasks = await getTasks();

  return (
    <div className="mt-[140px]">
      <h1
        className={`${boldFont.className} text-[34px] text-primary-headlines mb-[52px] `}
      >
        დავალებების გვერდი
      </h1>
      <FilterContainer>
        <FilterMenu />
      </FilterContainer>

      <StatusTitles />
      <TasksContainer tasks={tasks} />
    </div>
  );
}
