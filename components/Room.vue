<template>
  <div>
    <div class="roomContainer">
      <div class="pin">PIN : {{ this.$route.params.pin }}</div>
      <div class="roomInputContainer">
        <input
          type="text"
          placeholder="Team A's name"
          v-model="team1Name"
          :disabled="!admin"
          @input="teamName()"
          class="teamInputSelect shadowPermanent"
        />
        <input
          type="text"
          placeholder="Team B's name"
          v-model="team2Name"
          :disabled="!admin"
          @input="teamName()"
          class="teamInputSelect shadowPermanent"
        />
        <select
          v-model="draftModeSelected"
          @change="changeDraftMode()"
          :disabled="!admin"
          class="teamInputSelect"
          placeholder="Choisir un mode"
        >
          <option
            v-for="(option, index) in draftMode.optionsDraftMode"
            :value="option.value"
            >{{ option.text }}
          </option>
        </select>
        <button @click="startDraft()" class="startLockBtn">
          START
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  sockets: {
    RES_CHANGE_TEAM_NAME: function(ele) {
      this.team1Name = ele[0];
      this.team2Name = ele[1];
      this.$store.commit("draft/changeTeamName", ele);
    },
    RES_CHANGE_DRAFT_MODE: function(ele) {
      this.$store.commit("draft/changeDraftMode", ele);
    }
  },
  props: {
    admin: Boolean
  },
  data() {
    return {
      team1Name: "",
      team2Name: "",
      draftMode: {
        optionsDraftMode: [
          { text: "Classic 6 BANS - 10 PICKS", value: "Classic" },
          { text: "League 6 BANS - 8 PICKS", value: "League" },
          { text: "Light 4 BANS - 6 PICKS", value: "Light" },
          { text: "No bans 0 BANS - 10 PICKS", value: "No" }
        ]
      }
    };
  },
  methods: {
    teamName() {
      this.$socket.emit("CHANGE_TEAM_NAME", {
        path: this.$route.params.pin,
        teamName: [this.team1Name, this.team2Name]
      });
      this.$store.commit("draft/changeTeamName", [
        this.team1Name,
        this.team2Name
      ]);
    },
    changeDraftMode() {
      this.$socket.emit("CHANGE_DRAFT_MODE", {
        path: this.$route.params.pin,
        value: this.draftModeSelected
      });
    },
    startDraft() {
      this.$socket.emit("START_DRAFT", this.$route.params.pin);
    }
  },
  computed: {
    draftModeSelected: {
      get() {
        return this.$store.state.draft.draft.draftMode.name;
      },
      set(val) {
        this.$store.commit("draft/changeDraftName", val);
      }
    }
  }
};
</script>

<style></style>
