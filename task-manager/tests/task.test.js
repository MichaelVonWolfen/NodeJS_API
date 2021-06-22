const request = require("supertest");
const Task = require("../src/models/task");
const app = require("../src/app");
const { ObjectID } = require("mongodb");
const {
	UserOne,
	UserOneID,
	setUpDB,
	User2,
	User2ID,
	task1,
	task2,
	task3,
} = require("./fixtures/db");
beforeEach(setUpDB);
//Should DO:
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
test("Should Create task for user", async () => {
	const response = await request(app)
		.post("/tasks")
		.set("Authorization", `Bearer ${UserOne.tokens[0].token}`)
		.send({
			description: "From my test",
		})
		.expect(201);
	const task = await Task.findById(response.body._id);
	expect(task.description).toBe("From my test");
});
test("Check tasks saved in DB for User One", async () => {
	let response = await request(app)
		.get("/tasks")
		.set("Authorization", `Bearer ${UserOne.tokens[0].token}`)
		.send()
		.expect(200);
	expect(response.body.length).toEqual(2);
	expect(response.body).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				description: task1.description,
				completed: task1.completed,
			}),
		])
	);
	[task1, task2].forEach(async (task) => {
		for (let key in task) {
			let elementExists = await response.body.find(
				(task_element) =>
					task_element[key] === task1[key] ||
					String(new ObjectID(task1[key])) ===
						String(new ObjectID(task_element[key]))
			);
			expect(elementExists[key].toString()).toEqual(
				task1[key].toString()
			);
		}
	});
});
test("Check if creator of a task can delete that task", async () => {
	await request(app)
		.delete(`/tasks/${task1._id}`)
		.set("Authorization", `Bearer ${UserOne.tokens[0].token}`)
		.expect(200);
	let tasks = await Task.find({ owner: UserOneID });
	expect(tasks.length).toEqual(1);
});
test("Should not delete other users tasks", async () => {
	await request(app)
		.delete(`/tasks/${task3._id}`)
		.set("Authorization", `Bearer ${UserOne.tokens[0].token}`)
		.expect(404);
	let tasks = await Task.find({ owner: User2ID });
	expect(tasks.length).toEqual(1);
	expect(tasks[0]).toMatchObject(task3);
});
