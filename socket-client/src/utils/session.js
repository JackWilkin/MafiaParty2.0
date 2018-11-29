const sessionFuncs = {
  saveSession(state) {
    sessionStorage.setItem("mafiapartyname", state.name);
    sessionStorage.setItem("mafiapartygame", state.game);
    sessionStorage.setItem("mafiapartyowner", state.owner);
    sessionStorage.setItem("mafiapartyrole", state.role);
    sessionStorage.setItem("mafiapartyplayers", JSON.stringify(state.players));
    sessionStorage.setItem("mafiapartypathname", state.pathname);
  },
  getName() {
    return sessionStorage.getItem("mafiapartyname") || "";
  },
  getGame() {
    return sessionStorage.getItem("mafiapartygame") || "";
  },
  getOwner() {
    return sessionStorage.getItem("mafiapartyowner") || "";
  },
  getRole() {
    return sessionStorage.getItem("mafiapartyrole") || "";
  },
  getPlayers() {
    return JSON.parse(sessionStorage.getItem("mafiapartyplayers"));
  },
  getPath() {
    return sessionStorage.getItem("mafiapartypathname");
  },
  getAll() {
    return {
      name: sessionFuncs.getName(),
      game: sessionFuncs.getGame(),
      owner: sessionFuncs.getOwner(),
      role: sessionFuncs.getRole(),
      players: sessionFuncs.getPlayers(),
      pathname: sessionFuncs.getPath()
    }
  }
}

export default sessionFuncs;