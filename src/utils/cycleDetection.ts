export const detectCycles = (tasks: any[]) => {

const graph: any = {};

tasks.forEach((task) => {
 graph[task.id] = task.dependencies;
});

const visited = new Set();
const stack = new Set();

function dfs(node: number): boolean {

 if (stack.has(node)) return true;
 if (visited.has(node)) return false;

 visited.add(node);
 stack.add(node);

 for (const neighbor of graph[node] || []) {
  if (dfs(neighbor)) return true;
 }

 stack.delete(node);
 return false;
}

for (const task of tasks) {
 if (dfs(task.id)) {
  task.status = "Blocked";
 }
}

return tasks;
};