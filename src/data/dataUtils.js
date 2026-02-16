import { playerStats } from './playerStats';
import { gameDefinitions } from './gameDefinitions';

export function getAllPlayers() {
  return Object.values(playerStats);
}

export function getGamePlayers(gameNum) {
  return getAllPlayers()
    .filter(p => p.games.some(g => g.game_num === gameNum))
    .map(p => {
      const game = p.games.find(g => g.game_num === gameNum);
      return { name: p.name, ...game };
    });
}

export function getGameSummary(gameNum) {
  const def = gameDefinitions.find(g => g.gameNum === gameNum);
  const players = getGamePlayers(gameNum);
  const totalDamage = players.reduce((s, p) => s + p.damage, 0);
  const totalKills = players.reduce((s, p) => s + p.defeated, 0);
  const totalDeaths = players.reduce((s, p) => s + p.deaths, 0);
  const totalHealing = players.reduce((s, p) => s + p.heal, 0);
  const totalSiege = players.reduce((s, p) => s + p.siege_damage, 0);
  const totalTank = players.reduce((s, p) => s + p.tank, 0);
  return {
    ...def,
    playerCount: players.length,
    totalDamage,
    totalKills,
    totalDeaths,
    totalHealing,
    totalSiege,
    totalTank,
  };
}

export function getOverallStats() {
  const players = getAllPlayers();
  const totalGames = gameDefinitions.length;
  const wins = gameDefinitions.filter(g => g.result === 'win').length;
  const losses = totalGames - wins;
  const totalDamage = players.reduce((s, p) => s + p.total_damage, 0);
  const avgDamage = Math.round(totalDamage / totalGames);
  return {
    totalGames,
    wins,
    losses,
    winRate: ((wins / totalGames) * 100).toFixed(0),
    totalDamage,
    avgDamage,
    uniquePlayers: players.length,
  };
}

export function getAllPlayersSorted(sortKey = 'total_damage', ascending = false) {
  const players = getAllPlayers().map(p => ({
    name: p.name,
    games_played: p.games_played,
    total_damage: p.total_damage,
    total_defeats: p.total_defeats,
    total_assists: p.total_assists,
    total_deaths: p.total_deaths,
    total_heal: p.total_heal,
    total_tank: p.total_tank,
    total_siege: p.total_siege,
    avg_damage: Math.round(p.total_damage / p.games_played),
  }));
  return players.sort((a, b) => ascending ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
}

function topN(list, n = 10) {
  return list.slice(0, n);
}

export function getTopAvgDamage(n = 10) {
  const players = getAllPlayers().map(p => ({
    name: p.name,
    value: Math.round(p.total_damage / p.games_played),
  }));
  players.sort((a, b) => b.value - a.value);
  return topN(players, n);
}

export function getTopAvgHealers(n = 10) {
  const players = getAllPlayers()
    .filter(p => p.total_heal > 0)
    .map(p => ({
      name: p.name,
      value: Math.round(p.total_heal / p.games_played),
    }));
  players.sort((a, b) => b.value - a.value);
  return topN(players, n);
}

export function getTopAvgSiege(n = 10) {
  const players = getAllPlayers()
    .filter(p => p.total_siege > 0)
    .map(p => ({
      name: p.name,
      value: Math.round(p.total_siege / p.games_played),
    }));
  players.sort((a, b) => b.value - a.value);
  return topN(players, n);
}

export function getTopTotalKills(n = 10) {
  const players = getAllPlayers().map(p => ({
    name: p.name,
    value: p.total_defeats,
  }));
  players.sort((a, b) => b.value - a.value);
  return topN(players, n);
}

export function getTopTotalAssists(n = 10) {
  const players = getAllPlayers().map(p => ({
    name: p.name,
    value: p.total_assists,
  }));
  players.sort((a, b) => b.value - a.value);
  return topN(players, n);
}

export function getPlayerDetails(name) {
  return playerStats[name] || null;
}

export function getMatchDates() {
  const dates = new Set();
  gameDefinitions.forEach(g => dates.add(g.date.split(' ')[0]));
  return dates;
}

export function getMatchesByDate(dateStr) {
  return gameDefinitions.filter(g => g.date.startsWith(dateStr));
}

export function getAllGameSummaries() {
  return gameDefinitions
    .map(g => getGameSummary(g.gameNum))
    .sort((a, b) => a.gameNum - b.gameNum);
}

export function getPlayerGameDamage(name) {
  const player = playerStats[name];
  if (!player) return [];
  return [...player.games]
    .sort((a, b) => a.game_num - b.game_num)
    .map(g => g.damage);
}

export function getPlayerGameStat(name, stat) {
  const player = playerStats[name];
  if (!player) return [];
  return [...player.games]
    .sort((a, b) => a.game_num - b.game_num)
    .map(g => g[stat]);
}
