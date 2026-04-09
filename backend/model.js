const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);