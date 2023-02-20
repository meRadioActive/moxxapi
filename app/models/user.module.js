module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            username: String,
            steam: Number,
            license: String,
            xbl: Number,
            live: Number,
            discord: Number,
            fivem: Number,
            license2: String,
            ip: String,
            whitelist: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("user", schema);
};