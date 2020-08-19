module.exports = async function batchProcessQuery({ query, pageSize }, cb) {
  const snapshot = await query.limit(pageSize).get();
  let cursor = snapshot.docs[pageSize - 1];
  let count = await cb(snapshot);

  while (cursor) {
    const snapshot = await query
      .limit(pageSize)
      .startAfter(cursor)
      .get();

    cursor = snapshot.docs[pageSize - 1];

    if (snapshot.docs.length) {
      count += await cb(snapshot);
    }
  }

  return count;
};
