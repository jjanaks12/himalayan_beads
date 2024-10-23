import { a as buildAssetsURL } from '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import 'vue';
import '@unhead/shared';

const style = "@font-face{font-display:block;font-family:icomoon;font-style:normal;font-weight:400;src:url(" + buildAssetsURL("icomoon.BpVpslBF.eot?k34xh5") + ");src:url(" + buildAssetsURL("icomoon.BpVpslBF.eot?k34xh5#iefix") + ') format("embedded-opentype"),url(' + buildAssetsURL("icomoon.DKOInV-N.ttf?k34xh5") + ') format("truetype"),url(' + buildAssetsURL("icomoon.CxzYJong.woff?k34xh5") + ') format("woff"),url(' + buildAssetsURL("icomoon.DA39t3RM.svg?k34xh5#icomoon") + ') format("svg")}@font-face{font-family:EK Mukta;font-style:normal;font-weight:100;src:url(' + buildAssetsURL("ekmukta-extralight.uuJDXNj-.woff2") + ') format("woff2"),url(' + buildAssetsURL("ekmukta-extralight.07mr-HOX.woff") + ') format("woff")}@font-face{font-family:EK Mukta;font-style:normal;font-weight:300;src:url(' + buildAssetsURL("ekmukta-light.DLdlpPgt.woff2") + ') format("woff2"),url(' + buildAssetsURL("ekmukta-light.Dd1Lz2wb.woff") + ') format("woff")}@font-face{font-family:EK Mukta;font-style:normal;font-weight:400;src:url(' + buildAssetsURL("ekmukta-regular.DhOzcA0s.woff2") + ') format("woff2"),url(' + buildAssetsURL("ekmukta-regular.Ct82kyDT.woff") + ') format("woff")}@font-face{font-family:EK Mukta;font-style:normal;font-weight:500;src:url(' + buildAssetsURL("ekmukta-medium.BY6UoMxM.woff2") + ') format("woff2"),url(' + buildAssetsURL("ekmukta-medium.DEC9-vHm.woff") + ') format("woff")}@font-face{font-family:EK Mukta;font-style:normal;font-weight:600;src:url(' + buildAssetsURL("ekmukta-semibold.DdMfaCQq.woff2") + ') format("woff2"),url(' + buildAssetsURL("ekmukta-semibold.BjVVp-hP.woff") + ') format("woff")}@font-face{font-family:EK Mukta;font-style:normal;font-weight:700;src:url(' + buildAssetsURL("ekmukta-bold.Dxf0tKe-.woff2") + ') format("woff2"),url(' + buildAssetsURL("ekmukta-bold.B8U-mfp-.woff") + ') format("woff")}@font-face{font-family:EK Mukta;font-style:normal;font-weight:900;src:url(' + buildAssetsURL("ekmukta-extrabold.BlyjFgYV.woff2") + ') format("woff2"),url(' + buildAssetsURL("ekmukta-extrabold.22YdhJQM.woff") + ') format("woff")}';

const entryStyles_BZqTNi3M = [style];

export { entryStyles_BZqTNi3M as default };
//# sourceMappingURL=entry-styles.BZqTNi3M.mjs.map
