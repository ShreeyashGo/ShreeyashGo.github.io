"""Check linked cards in generated HTML, including production compression."""
import sys
from html.parser import HTMLParser
from pathlib import Path


class ResearchCards(HTMLParser):
    def __init__(self):
        super().__init__()
        self.cards = []
        self.card = None
        self.paragraph_open = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and "research-link" in attrs.get("class", "").split():
            assert self.card is None, "Research links must not be nested"
            self.card = {"href": attrs.get("href"), "heading": False, "paragraph": False, "action": False}
        if self.card is not None:
            if tag == "h3":
                self.card["heading"] = True
            if tag == "p":
                self.card["paragraph"] = True
                self.paragraph_open = True
            if "research-link-action" in attrs.get("class", "").split():
                self.card["action"] = True

    def handle_endtag(self, tag):
        if self.card is None:
            return
        if tag == "p":
            self.paragraph_open = False
        if tag == "a":
            assert not self.paragraph_open, "Closing </p> is missing inside a linked card"
            assert all(self.card[key] for key in ("heading", "paragraph", "action")), "Incomplete research card"
            self.cards.append(self.card)
            self.card = None


parser = ResearchCards()
parser.feed(Path(sys.argv[1]).read_text())
assert parser.card is None, "Unclosed research link"
assert [card["href"] for card in parser.cards] == ["/projects/", "/publications/", "/teaching/"], "Unexpected research card destinations"
print("PASS: three complete research cards with closing paragraph tags")
