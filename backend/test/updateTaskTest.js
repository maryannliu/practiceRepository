const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { updateTask } = require('../controllers/taskController');
const { expect } = chai;

describe('Task Controller - updateTask', () => {
  
  it('should update a task successfully', async () => {
    const req = {
      params: { id: new mongoose.Types.ObjectId() },
      body: {
        title: "Updated Title",
        description: "Updated Description",
        completed: true,
        deadline: "2025-12-31"
      }
    };

    const mockTask = {
      title: "Old Title",
      description: "Old Description",
      completed: false,
      deadline: "2025-01-01",
      save: sinon.stub().resolvesThis()
    };

    const findByIdStub = sinon.stub(Task, 'findById').resolves(mockTask);

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await updateTask(req, res);

    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(mockTask.title).to.equal("Updated Title");
    expect(mockTask.description).to.equal("Updated Description");
    expect(mockTask.completed).to.be.true;
    expect(mockTask.deadline).to.equal("2025-12-31");
    expect(res.json.calledWith(mockTask)).to.be.true;

    findByIdStub.restore();
  });

});
