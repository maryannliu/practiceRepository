// Import necessary libraries
const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const Task = require('../models/Task'); // Import models of tasks from the models folder
const { addTask } = require('../controllers/taskController'); // Import the function that create tasks from the controllers folder
const { expect } = chai; // Pull out the expect function from chai

// TEST 1: CREATE TASK

describe('Task Controller - createTask', () => { // describe: a function that group related case together
  
    it('should create a new task successfully', async () => { // it: provides description and a container for the code that does the testing
      
      // Mock request data (user fill out form of creating a task)
      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: { title: "New Task", description: "Task description", deadline: "2025-12-31" }
      };
  
      // Mock task that would be created (when an HTTP request is sent, the backend app process it, pass to Mongo DB to create the task, Mongo DB's object would like this)
      const createdTask = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };
  
      // Mock Mongo DB response (Don't connect to Mongo DB. Directly fake the response with the object just created)
      const createStub = sinon.stub(Task, 'create').resolves(createdTask);
  
      // Mock response object (Mock HTTP response that would be sent back to the browser)
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
  
      // Call function (the function that is supposed to be called in the controller file when an HTTP is sent to server)
      await addTask(req, res);
  
      // Assertions
      expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdTask)).to.be.true;
  
      // Restore stubbed methods
      createStub.restore();
  
    });
  
  });
  
