const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getNotes, createNote, updateNote, deleteNote, searchNotes } = require('../controllers/noteController');

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *       401:
 *         description: Authentication required
 */
router.get('/', auth, getNotes);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 50
 *               text:
 *                 type: string
 *                 maxLength: 300
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Authentication required
 */
router.post('/', auth, createNote);

/**
 * @swagger
 * /api/notes:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *                 maxLength: 50
 *               text:
 *                 type: string
 *                 maxLength: 300
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Note not found
 */
router.put('/', auth, updateNote);

/**
 * @swagger
 * /api/notes:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Note not found
 */
router.delete('/', auth, deleteNote);

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     summary: Search notes by title
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of notes matching the query
 *       401:
 *         description: Authentication required
 */
router.get('/search', auth, searchNotes);

module.exports = router;
