const { Book } = require('../models')
const methods = require('../services/countries')

const BooksController = {

    index: async (req, res) => {
        try {
            const books = await Book.findAll();

            if (!books) {
                return res.status(404).json({ message: "Error" })
            }

            return res.status(200).json({
                length: books.length,
                data: books
            })
        } catch (error) {
            console.log(error);
        }
    },

    show: async (req, res) => {
        try {
            const { id } = req.params;

            const book = await Book.findByPk(id, { raw: true })

            if (!book) {
                return res.status(404).json({ message: 'O livro não foi encontrado' })
            }

            const country = methods.getByAlphaCode(book.country_code.toLowerCase())
                .then(res => console.log(res))

            book.country = {
                name: country[0].name.common,
                flag: country[0].flags.svg
            }

            return res.status(200).json({ data: book })
        } catch (error) {

        }
    },

    store: async (req, res) => {
        try {
            const { title, total_pages, author, release_year, stock, country_code } = req.body

            const book = await Book.create({ title, total_pages, author, release_year, stock, country_code });

            if (!book) {
                return res.status(409).json({ message: 'Produto já cadastrado' })
            }

            return res.status(201).json({ data: book })
        } catch (error) {

        }
    },

    edit: async (req, res) => {
        try {

            const { id } = req.params;
            const { title, total_pages, author, release_year, stock, country_code } = req.body

            const verifyBookExist = await Book.findByPk(id);

            if (!verifyBookExist) {
                return res.status(404).json({ message: "Livro não encontrado" })
            }

            await Book.update({
                title,
                total_pages: Number(total_pages),
                author,
                release_year,
                stock: Number(stock),
                country_code
            }, {
                where: {
                    id: id
                }
            })

            const book = await Book.findByPk(id)

            return res.status(200).json({ data: book })

        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {

            const { id } = req.params

            const book = await Book.findByPk(id);

            if (!book) {
                return res.status(404).json({ message: "Livro não encontrado" })
            }

            await Book.destroy({ where: { id } });

            res.status(204).json()

        } catch (error) {
            console.log(error)
        }
    }
};


module.exports = BooksController;