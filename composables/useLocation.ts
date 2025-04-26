import { useRequestURL } from "nuxt/app";

export default `${useRequestURL().protocol}//${useRequestURL().host}/`