import pb from "../base/structure.js";
import {get_thePathArr} from "../base/global.js";

import * as PB__SAM_extends from "../pages/samples/extends.js";
import * as PB__SAM_layouts from "../pages/samples/layouts.js";
import * as PB__SAM_plugins from "../pages/samples/plugins.js";
import * as PB__SAM_renders from "../pages/samples/renders.js";
import * as PB__SAM_others from "../pages/samples/others.js";

function sampleRoute(data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[1]) {

    case pb.sam.extends.n:
      return PB__SAM_extends.extendsRouting(data, type)

    case pb.sam.layouts.n:
      // todo, it will be finished by end of the project.
      return PB__SAM_layouts.layoutsRouting(data, type);

    case pb.sam.plugins.n:
      return PB__SAM_plugins.pluginsRouting(data, type);

    case pb.sam.renders.n:
      return PB__SAM_renders.rendersRouting(data, type);

    case pb.sam.others.n:
      return PB__SAM_others.othersRouting(data, type)

  }
}

// Public methods

export const sampleRouting = function (data, type) {
  return sampleRoute(data, type);
};