const Category = require('./model/category')
const Task = require('./model/tasks')

const addTaskToCategory = function(taskId, categoryId) {
    return Task.findByIdAndUpdate(
        taskId,
        { category: categoryId },
        { new: true, useFindAndModify: false }
    );
}

const addCategoryToTask = function(taskId, categoryId) {
    return Category.findByIdAndUpdate(
        categoryId,
        { $push: {tasks: taskId} },
        { new: true, useFindAndModify: false }
    );
}

const createTask = function(task) {
    return Task.create(task).then(docTask => {
        console.log("\n>> Created Tutorial:\n", docTask);
        return docTask;
    })
}

const createCategory = function (category) {
    return Category.create(category).then(docCategory => {
        console.log("\n>> Created Tutorial:\n", docCategory);
        return docCategory;
    })
}

const run = async function() {

    let cat = await createCategory({
        name: 'todo'
    });

    for(let i=0; i<20; i++) {
        let task = await createTask({
            title: 'todo 1 title',
            message: 'todo 2 message'
        });
        task = await addTaskToCategory(task._id, cat._id);
        cat = await addCategoryToTask(task._id, cat._id);
    }

}

const getAllCategoryData = async function() {
    const categoryData = await Category.find({})
    return categoryData;
}

const getAllTaskData = async function() {
    const TaskData = await Task.find({})
    return TaskData;
}


//  Q. get count of all categories wise tasks from db
const countTask = async function() {
    const data = await Task.aggregate([
        {$match: {}},
        {$group: {_id: "$category", Count: { $sum: 1 }}}
    ])
    return data;
}

// Q  when one category is deleted. all task tied to that category to be also deleted
const deleteCategory = async function (res) {
    Category.findOneAndDelete({ name: "todo" }, (err, category) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log(category);
            Task.deleteMany({ _id: category._id }).then(function() {
                console.log("Data deleted");  //success
                res.send(category);
            }).catch((error) => {
                console.log(error);
            })

        }
    })
}

exports.deleteCategory = deleteCategory;
exports.run = run;
exports.getAllCategoryData = getAllCategoryData;
exports.getAllTaskData = getAllTaskData;
exports.countTask = countTask;