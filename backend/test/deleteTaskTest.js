const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { deleteTask } = require('../controllers/taskController');
const { expect } = chai;

describe('Task Controller - deleteTask', () => {
  
  it('should delete a task successfully', async () => {
    const req = {
      params: { id: new mongoose.Types.ObjectId() }
    };

    const mockTask = {
      remove: sinon.stub().resolves()
    };

    const findByIdStub = sinon.stub(Task, 'findById').resolves(mockTask);

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await deleteTask(req, res);

    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(mockTask.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Task deleted' })).to.be.true;

    findByIdStub.restore();
  });

});
