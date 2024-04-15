import { PageItem } from "nextra/normalize-pages"

export function getDirectoriesWithVersion(activeRoute: string, versions: Array<{name: string, dir: string}>, directories: PageItem[]) {
  debugger;
  const allRoutePaths = activeRoute.split('/');
    if (allRoutePaths.length > 1) {
      const basePath = allRoutePaths[1];
      const versionMatch = versions.find(version => version.dir === basePath);
      if (versionMatch) {
        // if under a version directory, filter out all flat directories outside this dir
        const filteredDirectories = directories.filter(dir => {
          const routes = dir.route.split("/");
          if (routes.length > 1) {
            const baseRoutePath = routes[1];
            return baseRoutePath === versionMatch.dir;
          }
          return true;
        });
        const versionDirectories = filteredDirectories.length > 0 && filteredDirectories[0].children ? filteredDirectories[0].children : [];
        return versionDirectories.length > 0 ? versionDirectories : [];
      }
    }
    
  return directories;
}