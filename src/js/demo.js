import "src/css/normalize.css";
import "font-awesome/css/font-awesome.min.css";
import "src/css/demo.css";
import "src/css/component.css";

import { Yuda } from "src/js/example-card-stacks/yuda/yuda";
import { Krisna } from "src/js/example-card-stacks/krisna/krisna";
import { Wangi } from "src/js/example-card-stacks/wangi/wangi";
import { Wira } from "src/js/example-card-stacks/wira/wira";
import { Slamet } from "src/js/example-card-stacks/slamet/slamet";
import { Utari } from "src/js/example-card-stacks/utari/utari";
import { Cinta } from "src/js/example-card-stacks/cinta/cinta";
import { Eka } from "src/js/example-card-stacks/eka/eka";
import { Dian } from "src/js/example-card-stacks/dian/dian";
import { Iman } from "src/js/example-card-stacks/iman/iman";
import { Iskandar } from "src/js/example-card-stacks/iskandar/iskandar";
import { Kasih } from "src/js/example-card-stacks/kasih/kasih";
import { Buana } from "src/js/example-card-stacks/buana/buana";
import { Mawar } from "src/js/example-card-stacks/mawar/mawar";

const yuda = new Yuda("stack_yuda");
const krisna = new Krisna("stack_krisna");
const wangi = new Wangi("stack_wangi");
const wira = new Wira("stack_wira");
const slamet = new Slamet("stack_slamet");
const utari = new Utari("stack_utari");
const cinta = new Cinta("stack_cinta");
const eka = new Eka("stack_eka");
const dian = new Dian("stack_dian");
const iman = new Iman("stack_iman");
const iskandar = new Iskandar("stack_iskandar");
const kasih = new Kasih("stack_kasih");
const buana = new Buana("stack_buana");
const mawar = new Mawar("stack_mawar");

//eslint-disable-next-line
console.log({
	yuda,
	krisna,
	wangi,
	wira,
	slamet,
	utari,
	cinta,
	eka,
	dian,
	iman,
	iskandar,
	kasih,
	buana,
	mawar
});
