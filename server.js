const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/displayData")
  .then((req,res)=>{
    console.log("MongoDb Database Connected");
  })
  .catch((err)=>{
    console.log(err);
  })


const todoSchema = mongoose.Schema(
  {
    task: { type: String, required: true },
  },
  { timestamps: true }
);
const todoModel = mongoose.model("todos", todoSchema);


app.get("/", async (req, res) => {
      const tasks = await todoModel.find({ userId: req.userId });
    console.log(tasks)
    res.status(200).json(tasks);
});

app.delete("/delete/:id", async (req, res) => {
    const tasks = await todoModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(tasks);
});


app.post("/todo", async (req, res) => {
  const { task } = req.body;
  const newTodo = new todoModel({
    task: task
  });
  await newTodo.save();
  res.status(201).json(newTodo);
});

app.listen(8081, () => {
  console.log("Server Started");
});
