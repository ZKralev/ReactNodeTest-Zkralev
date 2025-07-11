const MeetingHistory = require('../../model/schema/meeting');
const mongoose = require('mongoose');

// Create a new meeting
const add = async (req, res) => {
    try {
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(201).json({ message: 'Meeting created', meeting });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all meetings
const index = async (req, res) => {
    try {
        const meetings = await MeetingHistory.find();
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single meeting by ID
const view = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findById(req.params.id);
        if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a single meeting by ID
const deleteData = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findByIdAndDelete(req.params.id);
        if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
        res.status(200).json({ message: 'Meeting deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete multiple meetings by IDs (expects array of IDs in req.body.ids)
const deleteMany = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'No IDs provided' });
        }
        const result = await MeetingHistory.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: `${result.deletedCount} meetings deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { add, index, view, deleteData, deleteMany }