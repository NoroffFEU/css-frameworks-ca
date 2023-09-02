import "./scss/styles.scss";
import "./utils/register-components.ts";
import { Popover } from "bootstrap";

document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
  new Popover(popover);
});
