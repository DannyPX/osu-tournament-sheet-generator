/**
 * Made by DannyPX
 * Appscript library fetch mappools
 */

/**
 * Find beatmap by Id
 * @public
 * @param {Number} beatmapId Id of the beatmap
 */
export function findBeatmapById(beatmapId) {
  return ManiaMappoolDB.findOne(DB_COLLECTION.MAPS, { beatmapId: beatmapId })
}

/**
 * Find beatmapset by Id
 * @public
 * @param {Number} beatmapSetId Id of the beatmapset
 */
export function findBeatmapSetId(beatmapSetId) {
  return ManiaMappoolDB.findOne(DB_COLLECTION.MAPS, {beatmapSetId: beatmapSetId })
}

/**
 * Find beatmaps by multiple Ids
 * @public
 * @param {Number[]} beatmapIds Array of beatmap Ids
 */
export function findBeatmapsByIds(beatmapIds) {
  return ManiaMappoolDB.find(DB_COLLECTION.MAPS, { beatmapId: { $in: beatmapIds } })
}

/**
 * Find beatmapSets by multiple Ids
 * @public
 * @param {Number[]} beatmapSetIds Array of beatmapSet Ids
 */
export function findBeatmapSetsByIds(beatmapSetIds) {
  return ManiaMappoolDB.find(DB_COLLECTION.MAPS, { beatmapSetId: { $in: beatmapSetIds} })
}

/**
 * Find all beatmaps by title
 * @public
 * @param {String} title Part of the title
 * @param {Object} sort `Optional (Leave '{}' if not used)` A MongoDB sort expression that indicates sorted field names and directions.
 * @param {Number} limit `Optional (Leave '_' if not used)` The maximum number of matching documents to include the in the response.
 * @param {Number} skip `Optional (Leave '_' if not used)` The number of matching documents to omit from the response.
 */
export function findMapsByTitle(title, sort, limit, skip) {
  return ManiaMappoolDB.find(DB_COLLECTION.MAPS, { title: { $regex: "(?i)" + title } }, sort, limit, skip)
}

/**
 * Find all beatmaps by artist
 * @public
 * @param {String} artist Part of the artist
 * @param {Object} sort `Optional (Leave '{}' if not used)` A MongoDB sort expression that indicates sorted field names and directions.
 * @param {Number} limit `Optional (Leave '_' if not used)` The maximum number of matching documents to include the in the response.
 * @param {Number} skip `Optional (Leave '_' if not used)` The number of matching documents to omit from the response.
 */
export function findMapsByArtist(artist, sort, limit, skip) {
  return ManiaMappoolDB.find(DB_COLLECTION.MAPS, { artist: { $regex: "(?i)" + artist } }, sort, limit, skip)
}

/**
 * Fetch all beatmaps from a tournament using abbreviation
 * @public
 * @param {String} tournamentAbbreviation Tournament abbreviation
 * @param {Object} sort `Optional (Leave '{}' if not used)` A MongoDB sort expression that indicates sorted field names and directions.
 * @param {Number} limit `Optional (Leave '_' if not used)` The maximum number of matching documents to include the in the response.
 * @param {Number} skip `Optional (Leave '_' if not used)` The number of matching documents to omit from the response.
 */
export function findMapsFromTournament(tournamentAbbreviation, sort, limit, skip) {
  return ManiaMappoolDB.find(DB_COLLECTION.MAPS, { tournaments: { $elemMatch: { tournamentAbbreviation: { $regex: "(?i)" + tournamentAbbreviation } } } }, sort, limit, skip )
}

/**
 * Fetch all beatmaps from a tournament using abbreviation and round
 * @public
 * @param {String} tournamentAbbreviation Tournament abbreviation
 * @param {String} round Round of the given tournament
 * @param {Object} sort `Optional (Leave '{}' if not used)` A MongoDB sort expression that indicates sorted field names and directions.
 * @param {Number} limit `Optional (Leave '_' if not used)` The maximum number of matching documents to include the in the response.
 * @param {Number} skip `Optional (Leave '_' if not used)` The number of matching documents to omit from the response.
 */
export function findMapsFromTournamentAndRound(tournamentAbbreviation, round, sort, limit, skip) {
  return ManiaMappoolDB.find(DB_COLLECTION.MAPS, { tournaments: { $elemMatch: { tournamentAbbreviation: { $regex: "(?i)" + tournamentAbbreviation }, round: { $regex: "(?i)" + round } } } }, sort, limit, skip )
}

/**
 * Find tournaments by name
 * @public
 * @param {String} name Name of the tournament
 */
export function findTournamentByName(name) {
  return ManiaMappoolDB.find(DB_COLLECTION.TOURNAMENTS, { name: { $regex: "(?i)" + name } })
}

/**
 * Find tournaments by abbreviation
 * @public
 * @param {String} abbreviation Abbreviation of the tournament
 */
export function findTournamentByAbbreviation(abbreviation) {
  return ManiaMappoolDB.find(DB_COLLECTION.TOURNAMENTS, { abbreviation: { $regex: "(?i)" + abbreviation } })
}

/**
 * Find tournaments by name
 * @public
 * @param {String[]} name Name of the tournament
 */
export function findTournamentsByNames(names) {
  return ManiaMappoolDB.find(DB_COLLECTION.TOURNAMENTS, { name: { $in: names } })
}

/**
 * Find tournaments by abbreviation
 * @public
 * @param {String[]} abbreviation Abbreviation of the tournament
 */
export function findTournamentsByAbbreviations(abbreviations) {
  return ManiaMappoolDB.find(DB_COLLECTION.TOURNAMENTS, { abbreviation: { $in: abbreviations } })
}