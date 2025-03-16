import StatusTitles from "@/components/home/StatusTitles";

import TasksContainer from "@/components/home/TasksContainer";
import { getTasks } from "@/service/data-service";
import { boldFont } from "./fonts/fontWeigtht";
import FilterMenu from "@/components/filters/FilterMenu";
import FilterContainer from "@/components/filters/FilterContainer";

export default async function page() {
  const tasks = await getTasks();

  return (
    <div>
      <h1
        className={`${boldFont.className} text-[34px] text-primary-headlines mb-[52px] mt-10`}
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
