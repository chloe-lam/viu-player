import videojs from 'video.js';

const Button = videojs.getComponent('Button');

/**
 *  Button 详情
 */

class ViuAdvanceComponent extends Button {
  /**
   * Create a ViuTools plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    super(player, options);
    this.controlText('Text');
    this.on('mouseenter', () => {
      const viuTools = this.player_.viuTools();
      const index = viuTools.state.actionArea.findIndex((item) => item && item.name_ === 'ViuAdvance');

      viuTools.setState({
        isActionSelected: index
      });

      viuTools.setComponentSelected(index);
    });
  }

  buildCSSClass() {
    return `vjs-viu-advance-button vjs-control ${super.buildCSSClass()}`;
  }
  handleClick() {
    this.player_.getChild('viuAdvancePanel').handleClick();

    if (!this.hasClass('vjs-advance-active')) {
      this.addClass('vjs-advance-active');
      this.player_.viuTools().setUniquePanelOpen('isAdvanceAreaSelected');
    } else {
      this.removeClass('vjs-advance-active');
      this.player_.viuTools().setAllPanelClose();
    }
  }
}
videojs.registerComponent('viuAdvance', ViuAdvanceComponent);
export default ViuAdvanceComponent;
