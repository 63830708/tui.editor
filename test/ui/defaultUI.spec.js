/**
 * @fileoverview test default UI
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
import ToastUIEditor from '../../src/js/editor';
import DefaultUI from '../../src/js/ui/defaultUI';
import Toolbar from '../../src/js/ui/toolbar';

describe('DeafultUI', () => {
  let container, editor, defaultUI;

  beforeEach(() => {
    container = document.createElement('div');
    editor = new ToastUIEditor({
      el: container,
      UI: {
        getEditorHeight: () => 0,
        getEditorSectionHeight: () => 0,
        remove: () => 0
      }
    });
    defaultUI = new DefaultUI(editor);
  });

  afterEach(() => {
    editor.remove();
  });

  describe('getToolbar()', () => {
    it('should return Toolbar instance', () => {
      expect(defaultUI.getToolbar() instanceof Toolbar).toBe(true);
    });
  });

  describe('setToolbar()', () => {
    it('should set new Toolbar instance and free previous instance', () => {
      const newToolbar = new Toolbar(editor.eventManager);
      const prevToolbar = defaultUI.getToolbar();
      const spy = jasmine.createSpy('destroy');
      prevToolbar.destroy = spy;

      defaultUI.setToolbar(newToolbar);
      expect(defaultUI.getToolbar()).toBe(newToolbar);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('_initToolbar()', () => {
    it('should populate default buttons', () => {
      expect(defaultUI.getToolbar().getItems().length).toBeGreaterThan(0);
    });
  });
});
