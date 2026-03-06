export const validateDependencies = (tasks: any[]) => {

const validIds = tasks.map((t) => t.id);

tasks.forEach((task) => {
 task.dependencies = task.dependencies.filter((id: number) =>
  validIds.includes(id)
 );
});

return tasks;
};