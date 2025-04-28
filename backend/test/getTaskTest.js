const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { getTasks } = require('../controllers/taskController');
const { expect } = chai;

describe('Task Controller - getTasks', () => {
  
  it('should fetch tasks successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() }
    };

    const mockTasks = [
      { title: 'Task 1', description: 'First task', deadline: '2025-01-01' },
      { title: 'Task 2', description: 'Second task', deadline: '2025-02-01' }
    ];

    const findStub = sinon.stub(Task, 'find').resolves(mockTasks);

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await getTasks(req, res);

    expect(findStub.calledOnceWith({ userId: req.user.id })).to.be.true;
    expect(res.json.calledWith(mockTasks)).to.be.true;

    findStub.restore();
  });

});
