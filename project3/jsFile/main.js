/* ============================================================
   main.js — builds the entry list and handles the story form.
   Uses jQuery. Data comes from ENTRIES (entries.js).
   ============================================================ */
const firebaseConfig = {
    apiKey: "AIzaSyC9Nc6_cZXAmTSOz5wbpe2GMIpXiat5pcw",
    authDomain: "iml300-p3-userdata.firebaseapp.com",
    projectId: "iml300-p3-userdata",
    storageBucket: "iml300-p3-userdata.firebasestorage.app",
    messagingSenderId: "478289041693",
    appId: "1:478289041693:web:62cdb8af96ce31fca669f4"
};

/* Submitted stories will come from Firebase. Until then: empty. */
function loadSubs() {
  return [];
}

/* Scholarly + social entries, plus any submitted stories. */
function allEntries() {
  return ENTRIES.concat(loadSubs());
}


/* ---------- Rendering ---------- */

function render() {
  var all = allEntries();
  var $list = $("#list").empty();

  $("#count").text(all.length);

  $.each(all, function (i, e) {
    $list.append(buildEntry(e));
  });

  /* Tell the p5 sketch the entry count may have changed. */
  if (window.redrawSketch) window.redrawSketch();
}

/* One <li>: a [+] toggle button, the kind label, and the hidden body. */
function buildEntry(e) {
  var $btn = $("<button class='link' type='button'>").text("[+] " + e.title);
  var $body = $("<div class='entry'>").hide();

  $body.append($("<p>").text(e.text));
  $body.append(buildSource(e));

  $btn.on("click", function () {
    $body.toggle();
    $btn.text(($body.is(":visible") ? "[−] " : "[+] ") + e.title);
  });

  return $("<li>").append($btn, " ", $("<small>").text("(" + e.kind + ")"), $body);
}

/* The "Source: …" line, with a link when the entry has a URL. */
function buildSource(e) {
  var $src = $("<p><small></small></p>");
  $src.find("small").text("Source: " + e.citation + " ");
  if (e.url) {
    $src.find("small").append($("<a target='_blank'>").attr("href", e.url).text("link"));
  }
  return $src;
}


/* ---------- Startup ---------- */

$(function () {
  render();

  $("#story-form").on("submit", function (ev) {
    ev.preventDefault();
    // TODO: send the story to Firebase here, then call render() to refresh the list.
    alert("Firebase is not connected yet.");
  });
});