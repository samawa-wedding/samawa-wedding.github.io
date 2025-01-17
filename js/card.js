import { util } from "./util.js";
import { theme } from "./theme.js";
import { session } from "./session.js";
import { storage } from "./storage.js";
import { pagination } from "./pagination.js";
import { data } from "./data.js";

export const card = (() => {
    let user = null;
    let owns = null;
    let likes = null;
    let config = null;
    let tracker = null;
    let showHide = null;

    const maxCommentLength = 250;

    const renderLoading = () => {
        const comments = document.getElementById("comments");
        if (comments.getAttribute("data-loading") === "true") {
            return;
        }

        comments.setAttribute("data-loading", "true");
        comments.innerHTML = `
        <div class="bg-theme-${theme.isDarkMode(
            "dark",
            "light"
        )} shadow p-3 mx-0 mt-0 mb-3 rounded-4">
            <div class="d-flex flex-wrap justify-content-between align-items-center placeholder-wave">
                <span class="placeholder bg-secondary col-5 rounded-3 my-1"></span>
                <span class="placeholder bg-secondary col-3 rounded-3 my-1"></span>
            </div>
            <hr class="text-${theme.isDarkMode("light", "dark")} my-1">
            <p class="placeholder-wave m-0">
                <span class="placeholder bg-secondary col-6 rounded-3"></span>
                <span class="placeholder bg-secondary col-5 rounded-3"></span>
                <span class="placeholder bg-secondary col-12 rounded-3 my-1"></span>
            </p>
        </div>`.repeat(pagination.getPer());
    };

    const convertMarkdownToHTML = (input) => {
        const text = theme.isDarkMode("light", "dark");
        const lists = [
            ["*", `<strong class="text-${text}">$1</strong>`],
            ["_", `<em class="text-${text}">$1</em>`],
            ["~", `<del class="text-${text}">$1</del>`],
            ["```", `<code class="font-monospace text-${text}">$1</code>`],
        ];

        lists.forEach((data) => {
            const k = data[0];
            const v = data[1];

            input = input.replace(
                new RegExp(`\\${k}(?=\\S)(.*?)(?<!\\s)\\${k}`, "gs"),
                v
            );
        });

        return input;
    };

    const renderLike = (comment) => {
        return `
        <button style="font-size: 0.8rem;" onclick="comment.like.like(this)" data-uuid="${comment.uuid
            }" class="btn btn-sm btn-outline-${theme.isDarkMode(
                "light",
                "dark"
            )} ms-auto rounded-3 p-0 shadow-sm d-flex justify-content-start align-items-center" data-offline-disabled="false">
            <span class="my-0 mx-1" data-count-like="${comment.like.love}">${comment.like.love
            }</span>
            <i class="me-1 ${likes.has(comment.uuid)
                ? "fa-solid fa-heart text-danger"
                : "fa-regular fa-heart"
            }"></i>
        </button>`;
    };

    const renderAction = (comment) => {
        const btn = theme.isDarkMode("light", "dark");

        let action = `<div class="d-flex flex-wrap justify-content-start align-items-center" data-button-action="${comment.uuid}">`;

        if (
            config.get("can_reply") == true ||
            config.get("can_reply") === undefined
        ) {
            action += `<button style="font-size: 0.8rem;" onclick="comment.reply(this)" data-uuid="${comment.uuid}" class="btn btn-sm btn-outline-${btn} rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Reply</button>`;
        }

        if (
            owns.has(comment.uuid) &&
            (config.get("can_edit") == true || config.get("can_edit") === undefined)
        ) {
            action += `<button style="font-size: 0.8rem;" onclick="comment.edit(this)" data-uuid="${comment.uuid}" class="btn btn-sm btn-outline-${btn} rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Edit</button>`;
        }

        if (session.isAdmin()) {
            action += `<button style="font-size: 0.8rem;" onclick="comment.remove(this)" data-uuid="${comment.uuid}" class="btn btn-sm btn-outline-${btn} rounded-4 py-0 me-1 shadow-sm" data-own="${comment.own}" data-offline-disabled="false">Delete</button>`;
        } else if (
            owns.has(comment.uuid) &&
            (config.get("can_delete") == true ||
                config.get("can_delete") === undefined)
        ) {
            action += `<button style="font-size: 0.8rem;" onclick="comment.remove(this)" data-uuid="${comment.uuid}" class="btn btn-sm btn-outline-${btn} rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Delete</button>`;
        }

        action += "</div>";

        return action;
    };

    const renderReadMore = (uuid, comments) => {
        const hasId = showHide.get("show").includes(uuid);
        return `<a class="text-${theme.isDarkMode(
            "light",
            "dark"
        )}" style="font-size: 0.8rem;" onclick="comment.showOrHide(this)" data-uuid="${uuid}" data-uuids="${comments.join(
            ","
        )}" data-show="${hasId ? "true" : "false"
            }" role="button" class="me-auto ms-1 py-0">${hasId ? "Hide replies" : `Show replies (${comments.length})`
            }</a>`;
    };

    const renderButton = (comment) => {
        return `
        <div class="d-flex flex-wrap justify-content-between align-items-center" id="button-${comment.uuid
            }">
            ${renderAction(comment)}
            ${comment.comments.length > 0
                ? renderReadMore(
                    comment.uuid,
                    comment.comments.map((c) => c.uuid)
                )
                : ""
            }
            ${renderLike(comment)}
        </div>`;
    };

    const renderTracker = (comment) => {
        if (
            comment.ip === undefined ||
            comment.user_agent === undefined ||
            comment.is_admin
        ) {
            return "";
        }

        const text = theme.isDarkMode("light", "dark");
        return `
        <div class="p-2 my-2 rounded-3 border">
            <p class="text-${text} mb-1 mx-0 mt-0 p-0" style="font-size: 0.7rem;" id="ip-${comment.uuid
            }"><i class="fa-solid fa-location-dot me-1"></i>${util.escapeHtml(
                comment.ip
            )} ${tracker.has(comment.ip)
                ? `<strong>${tracker.get(comment.ip)}</strong>`
                : `<span class="mb-1 placeholder col-2 rounded-3"></span>`
            }</p>
            <p class="text-${text} m-0 p-0" style="font-size: 0.7rem;"><i class="fa-solid fa-mobile-screen-button me-1"></i>${util.escapeHtml(
                comment.user_agent
            )}</p>
        </div>`;
    };

    const renderHeader = (comment, is_parent) => {
        const btn = theme.isDarkMode("dark", "light");

        if (is_parent) {
            return `class="bg-theme-${btn} shadow p-3 mx-0 mt-0 mb-3 rounded-4" data-parent="true"`;
        }

        return `class="${!showHide.get("hidden").find((item) => item.uuid === comment.uuid)["show"]
            ? "d-none"
            : ""
            } overflow-x-scroll mw-100 border-start bg-theme-${btn} py-2 ps-2 pe-0 my-2 ms-2 me-0"`;
    };

    const renderTitle = (comment, is_parent) => {
        const hadirIcon =
            '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgb(16 185 129)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>';
        const absentIcon =
            '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f37171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-x w-4 h-4"><path d="m15 9-6 6"/><path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/><path d="m9 9 6 6"/></svg>';
        const admin =
            '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="rgb(244 63 94)" stroke="rgb(244 63 94)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart w-4 h-4"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>';

        if (comment.is_admin == 1) {
            return `<strong class="me-1">${util.escapeHtml(
                comment.name
            )}</strong><i>${admin}</i>`;
        }

        if (is_parent) {
            //return `<strong class="me-1">${util.escapeHtml(comment.name)}</strong><i id="badge-${comment.uuid}"  class="fa-solid ${comment.presence == 1 ? ' fa-circle-check text-success' : ' fa-circle-xmark text-danger'}"></i>`;
            return `<strong class="me-1">${util.escapeHtml(
                comment.name
            )}</strong><i id="badge-${comment.uuid}" class="">${comment.presence == 1 ? `${hadirIcon}` : `${absentIcon}`
                }</i>`;
        }

        return `<strong>${util.escapeHtml(comment.name)}</strong>`;
    };

    // const renderTitleOri = (comment, is_parent) => {
    //     if (comment.is_admin) {
    //         return `<strong class="me-1">${util.escapeHtml(user.get('name') ?? config.get('name'))}</strong><i class="fa-solid fa-certificate text-primary"></i>`;
    //     }

    //     if (is_parent) {
    //         return `<strong class="me-1">${util.escapeHtml(comment.name)}</strong><i id="badge-${comment.uuid}" class="fa-solid ${comment.presence ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'}"></i>`;
    //     }

    //     return `<strong>${util.escapeHtml(comment.name)}</strong>`;
    // };

    const renderBody = (comment, is_parent) => {
        const text = theme.isDarkMode("light", "dark");
        const original = convertMarkdownToHTML(util.escapeHtml(comment.comment));
        const moreThanMaxLength = original.length > maxCommentLength;

        return `
        <div class="d-flex flex-wrap justify-content-between align-items-center">
            <p class="text-${text} text-truncate m-0 p-0" style="font-size: 0.95rem;">${renderTitle(
            comment,
            is_parent
        )}</p>
            <small class="text-${text} m-0 p-0" style="font-size: 0.75rem;">${comment.created_at
            }</small>
        </div>
        <hr class="text-${text} my-1">
        <p class="text-${text} my-1 mx-0 p-0" style="white-space: pre-wrap !important; font-size: 0.95rem;" ${moreThanMaxLength ? `data-comment="${util.base64Encode(original)}"` : ""
            } id="content-${comment.uuid}">${moreThanMaxLength ? original.slice(0, maxCommentLength) + "..." : original
            }</p>
        ${moreThanMaxLength
                ? `<p class="mb-2 mt-0 mx-0 p-0"><a class="text-${text}" role="button" style="font-size: 0.85rem; display: block;" data-show="false" onclick="comment.showMore(this, '${comment.uuid}')">Selengkapnya</a></p>`
                : ""
            }`;
    };

    const renderContent = (comment, is_parent) => {
        return `
        <div ${renderHeader(comment, is_parent)} id="${comment.uuid
            }" style="overflow-wrap: break-word !important;">
            <div id="body-content-${comment.uuid
            }" data-tapTime="0" data-liked="false" tabindex="0">
            ${renderBody(comment, is_parent)}
            </div>
            ${renderTracker(comment)}
            ${renderButton(comment)}
            <div id="reply-content-${comment.uuid}">${comment.comments
                .map((c) => renderInnerContent(c))
                .join("")}</div>
        </div>`;
    };

    const renderInnerContent = (comment) => renderContent(comment, false);

    const renderReply = (id) => {
        const inner = document.createElement("div");
        inner.classList.add("my-2");
        inner.id = `inner-${id}`;
        inner.innerHTML = `
        <label for="form-inner-${id}" class="form-label" style="font-size: 0.95rem;"><i class="fa-solid fa-reply me-1"></i>Reply</label>
        <textarea class="form-control shadow-sm rounded-4 mb-2" id="form-inner-${id}" placeholder="Type reply comment" rows="3" data-offline-disabled="false"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="comment.cancel('${id}')" class="btn btn-sm btn-outline-${theme.isDarkMode(
            "light",
            "dark"
        )} rounded-4 py-0 me-1" data-offline-disabled="false">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="comment.send(this)" data-uuid="${id}" class="btn btn-sm btn-outline-${theme.isDarkMode(
            "light",
            "dark"
        )} rounded-4 py-0" data-offline-disabled="false">Send</button>
        </div>`;

        return inner;
    };

    const renderEdit = (id, presence) => {
        const inner = document.createElement("div");
        inner.classList.add("my-2");
        inner.id = `inner-${id}`;
        inner.innerHTML = `
        <label for="form-inner-${id}" class="form-label" style="font-size: 0.95rem;"><i class="fa-solid fa-pen me-1"></i>Edit</label>
        ${document.getElementById(id).getAttribute("data-parent") === "true" &&
                !session.isAdmin()
                ? `
        <select class="form-select shadow-sm mb-2 rounded-4" id="form-inner-presence-${id}" data-offline-disabled="false">
            <option value="1" ${presence ? "selected" : ""}>Datang</option>
            <option value="2" ${presence ? "" : "selected"}>Berhalangan</option>
        </select>`
                : ""
            }
        <textarea class="form-control shadow-sm rounded-4 mb-2" id="form-inner-${id}" placeholder="Type update comment" rows="3" data-offline-disabled="false"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="comment.cancel('${id}')" class="btn btn-sm btn-outline-${theme.isDarkMode(
                "light",
                "dark"
            )} rounded-4 py-0 me-1" data-offline-disabled="false">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="comment.update(this)" data-uuid="${id}" class="btn btn-sm btn-outline-${theme.isDarkMode(
                "light",
                "dark"
            )} rounded-4 py-0" data-offline-disabled="false">Update</button>
        </div>`;

        return inner;
    };

    const init = () => {
        user = storage("user");
        owns = storage("owns");
        likes = storage("likes");
        config = storage("config");
        tracker = storage("tracker");
        showHide = storage("comment");
    };

    return {
        init,
        renderEdit,
        renderReply,
        renderLoading,
        renderReadMore,
        renderInnerContent,
        renderContent: (comment) => renderContent(comment, true),
        convertMarkdownToHTML,
        maxCommentLength,
    };
})();
