class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, "Bedroom");
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        
        if (locationData.Choices && locationData.Choices.length > 0) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.show("You have reached the end of your investigation.");
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("> " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.show("You have reached the end of your investigation.");
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show(this.engine.storyData.Locations.End.Body);
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
