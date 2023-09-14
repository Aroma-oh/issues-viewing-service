import data from './db.json';

const getData = (req, res) => {
    res.status(200).json(data);
};

export default getData;
